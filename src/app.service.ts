import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { ConfigService } from '@nestjs/config';
import constants from '../constants';

type AuthConfig = {
  clientId: string;
  clientSecret: string;
};

export type TokenRequest = {
  /**
   * Code received from Github after authenticating the user in the UI.
   */
  clientAuthCode: string;
};

export type TokenResponse = {
  accessToken: string;
};

type GitHubAuthRequest = {
  client_id: string;
  client_secret: string;
  code: string;
};

type GitHubAuthResponse = {
  /**
   * Type of token.
   *
   * @example: bearer
   */
  token_type?: string;

  /**
   * Access token
   * @example 16C7e42F292c6912E7710c838347Ae178B4a
   */
  access_token?: string;

  /**
   * Comma-separated list of scopes
   *
   * @example repo,gist
   */
  scope?: string;

  error?: string;
  error_description?: string;
  error_uri?: string;
};

@Injectable()
export class AppService {
  private authConfig: AuthConfig;

  constructor(private configService: ConfigService) {
    this.authConfig = {
      clientId: this.configService.get<string>(
        constants.environmentVariables.clientId,
      ),
      clientSecret: this.configService.get<string>(
        constants.environmentVariables.clientSecret,
      ),
    };
  }

  async token(input: TokenRequest): Promise<TokenResponse> {
    const body: GitHubAuthRequest = {
      client_id: this.authConfig.clientId,
      client_secret: this.authConfig.clientSecret,
      code: input.clientAuthCode,
    };

    const headers = {
      accept: 'application/json',
    };

    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      body,
      {
        headers,
      },
    );

    try {
      const data: GitHubAuthResponse = response.data;

      if (data.error) {
        handleError(data);
      }

      return {
        accessToken: data.access_token,
      };
    } catch (err) {
      // TODO: handle error
      console.error('Error getting GitHub auth token', err);
      throw new Error('Unexpected error');
    }
  }
}

function handleError(gitHubResponse: GitHubAuthResponse): void {
  if (!gitHubResponse.error) {
    return;
  }

  throw new Error('Unexpected error');
}
