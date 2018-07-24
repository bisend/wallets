export default function (context) {
    context.store.dispatch('initAuth', process.server ? context.req : null)
}