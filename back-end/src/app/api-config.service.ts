import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { isNil } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  private getArray(key: string, emptyValue: unknown = []): never[] {
    const value = this.get(key);

    return value.length > 0
      ? (value.split(',') as never)
      : (emptyValue as never);
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get pushitApiConfig() {
    return {
      apiUrl: this.getString('PUSHIT_API_URL'),
      sessionId: this.getString('PUSHIT_SESSION_ID'),
    }
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set');
    }

    return value;
  }
}
