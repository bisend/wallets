export default function (context) {
    if (context.store.getters.isAuthenticated) {
        if (context.route.path.indexOf('/login') > -1 || context.route.path.indexOf('/register') > -1) {
            context.redirect('/')
        }
    } else if ( ! context.store.getters.isAuthenticated && 
        context.route.path.indexOf('/login') &&
        context.route.path.indexOf('/register')) {
        context.redirect('/login')
    }   
}