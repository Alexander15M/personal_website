import { makeRouteHandler } from '@keystatic/next/route-handler'
import config from '../../../../keystatic.config'

const handler = makeRouteHandler({ config })

// Local-mode Keystatic can write files, so never expose it outside `next dev`.
const disabled = () => new Response('Not found', { status: 404 })
const isProd = process.env.NODE_ENV === 'production'

export const GET = isProd ? disabled : handler.GET
export const POST = isProd ? disabled : handler.POST
