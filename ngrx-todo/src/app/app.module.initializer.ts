import { ConfigService } from './services/config.service';

function loadConfig(configService: ConfigService): Promise<any> {
  return configService.loadEnvironmentConfig();
}

export function Initializer(configService: ConfigService) {
  return () => new Promise<any>(async (resolve, reject) => {
      await loadConfig(configService);
    resolve();
  });
}
