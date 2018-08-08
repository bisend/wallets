export default function (context) {
    if (context.store.getters.isAuthenticated) {
        if (context.route.name == 'login' || context.route.name == 'register') {
            context.redirect('/')
        }
    } else if ( ! context.store.getters.isAuthenticated && 
        context.route.name != 'login' && 
        context.route.name != 'register') {
        context.redirect('/login')
    }
}