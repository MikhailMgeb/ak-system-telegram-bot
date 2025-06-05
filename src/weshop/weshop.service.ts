import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { WE_SHOP_CONFIG } from "../../constants";

interface ProcessImageResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

@Injectable()
export class WeShopService {
  private readonly apiKey: string;
  private readonly baseUrl = WE_SHOP_CONFIG.BASE_URL;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>("WE_SHOP_API_KEY");
  }

  async processImage(
    imageUrl: string,
    prompt: string,
  ): Promise<ProcessImageResult> {
    try {
      if (!this.apiKey) {
        throw new Error("API_KEY not configured");
      }

      const uploadResponse = await this.uploadImage(imageUrl);

      if (!uploadResponse.success) {
        return { success: false, error: uploadResponse.error };
      }

      // Затем обрабатываем изображение
      const processResponse = await axios.post(
        `${this.baseUrl}/image/edit`,
        {
          image_id: uploadResponse.imageId,
          prompt: prompt,
          model: "weshop-v1", // или другая доступная модель
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (processResponse.data.success) {
        return {
          success: true,
          imageUrl: processResponse.data.result.image_url,
        };
      } else {
        return {
          success: false,
          error: processResponse.data.message || "Unknown error",
        };
      }
    } catch (error) {
      console.error("AI Service Error:", error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        return { success: false, error: `API Error: ${message}` };
      }

      return { success: false, error: error.message };
    }
  }

  private async uploadImage(
    imageUrl: string,
  ): Promise<{ success: boolean; imageId?: string; error?: string }> {
    try {
      // Скачиваем изображение
      const imageResponse = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });

      // Конвертируем в base64
      const imageBase64 = Buffer.from(imageResponse.data).toString("base64");

      // Загружаем в Weshop
      const uploadResponse = await axios.post(
        `${this.baseUrl}/image/upload`,
        {
          image: imageBase64,
          format: "base64",
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (uploadResponse.data.success) {
        return {
          success: true,
          imageId: uploadResponse.data.result.image_id,
        };
      } else {
        return {
          success: false,
          error: uploadResponse.data.message || "Upload failed",
        };
      }
    } catch (error) {
      console.error("Upload Error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
