import { dashboardModule } from './modules/admin/dashboard.module.js'
import { contentModule } from './modules/admin/content.module.js'
import { settingsModule } from './modules/admin/settings.module.js'
import { aboutModule } from './modules/front/about.module.js'
import { blogModule } from './modules/front/blog.module.js'
import { projectsModule } from './modules/front/projects.module.js'

const registry = [
  aboutModule,
  blogModule,
  projectsModule,
  dashboardModule,
  contentModule,
  settingsModule,
]

export const portalModules = registry.reduce(
  (acc, module) => {
    acc[module.portal].push(module)
    return acc
  },
  {
    front: [],
    admin: [],
  },
)

export const groupedModules = Object.fromEntries(
  Object.entries(portalModules).map(([portal, modules]) => [
    portal,
    modules.reduce((groups, module) => {
      const existing = groups.find((item) => item.key === module.group.key)

      if (existing) {
        existing.modules.push(module)
      } else {
        groups.push({
          ...module.group,
          modules: [module],
        })
      }

      return groups
    }, []),
  ]),
)

export const moduleStats = {
  total: registry.length,
  front: portalModules.front.length,
  admin: portalModules.admin.length,
  status: {
    online: registry.filter((module) => module.status === 'online').length,
    planning: registry.filter((module) => module.status === 'planning').length,
    building: registry.filter((module) => module.status === 'building').length,
  },
}
