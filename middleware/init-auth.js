export default function (context) {
    return context.store.dispatch('initAuth', process.server ? context.req : null)
}