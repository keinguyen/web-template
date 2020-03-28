const isDev = process.env.NODE_ENV === 'development'

window.enableConsole = window.enableConsole || isDev
