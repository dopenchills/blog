@description('Name of the Azure Static Web App.')
param staticSites_blog_name string = 'blog'

resource staticSite 'Microsoft.Web/staticSites@2025-03-01' = {
  name: 'blog'
  location: 'East Asia'
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
