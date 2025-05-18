const { withAppBuildGradle, withProjectBuildGradle } = require("@expo/config-plugins");

module.exports = (config) => {
  // Passo 1: Garantir que o Kotlin NÃO seja atualizado (mantenha 1.9.0)
  config = withProjectBuildGradle(config, (cfg) => {
    const buildGradle = cfg.modResults.contents;

    // Forçar a versão do play-services-ads no projeto (opcional, mas recomendado)
    const updatedBuildGradle = buildGradle.replace(
      /ext\s*{\s*[\s\S]*?googlePlayServicesAdsVersion\s*=\s*["']\d+\.\d+\.\d+["']/,
      `ext {
        googlePlayServicesAdsVersion = "22.6.0"`,
    );

    cfg.modResults.contents = updatedBuildGradle;
    return cfg;
  });

  // Passo 2: Modificar o build.gradle do app
  config = withAppBuildGradle(config, (cfg) => {
    const appBuildGradle = cfg.modResults.contents;

    // Adicionar exclusão + implementação manual do play-services-ads
    const newDependencies = `dependencies {
        implementation(project(':react-native-google-mobile-ads')) {
            exclude group: 'com.google.android.gms', module: 'play-services-ads'
        }
        implementation 'com.google.android.gms:play-services-ads:22.6.0'`;

    const updatedAppBuildGradle = appBuildGradle.replace(
      /dependencies\s*{/,
      newDependencies,
    );

    // Forçar todas as dependências a usar a mesma versão (adicionar se necessário)
    const resolutionStrategy = `
    configurations.all {
        resolutionStrategy {
            force 'com.google.android.gms:play-services-ads:22.6.0'
        }
    }`;

    const finalBuildGradle = updatedAppBuildGradle.replace(
      /android\s*{/,
      `android {
    ${resolutionStrategy}`,
    );

    cfg.modResults.contents = finalBuildGradle;
    return cfg;
  });

  return config;
};
