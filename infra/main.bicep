@description('Name of the Azure Static Web App.')
param staticSites_blog_name string = 'blog'

@description('Azure region for the Static Web App.')
param location string = 'East Asia'

resource staticSite 'Microsoft.Web/staticSites@2024-11-01' = {
  name: staticSites_blog_name
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    repositoryUrl: 'https://github.com/dopenchills/${staticSites_blog_name}'
    branch: 'main'
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    provider: 'GitHub'
    enterpriseGradeCdnStatus: 'Disabled'
  }
}

output staticSiteId string = staticSite.id
output defaultHostname string = staticSite.properties.defaultHostname
