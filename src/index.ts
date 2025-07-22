import config from './config';
import logger from './logger';
import ExpressServer from './expressServer';

const launchServer = async (): Promise<void> => {
  try {
    const expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
    expressServer.launch();
    logger.info('Express server running');
  } catch (error) {
    logger.error('Express Server failure', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
};

launchServer().catch(e => logger.error(e));