// ember-source's generated types re-export setHelperManager & friends from
// '@glimmer/manager/lib/public/index', but the module they ship is declared as
// '@glimmer/manager/lib/public'. The dangling re-export silently becomes `any`
// (hidden by skipLibCheck), which typescript-eslint then reports as an error
// type. Bridge the two names so the real types come through.
declare module '@glimmer/manager/lib/public/index' {
  export * from '@glimmer/manager/lib/public';
}
