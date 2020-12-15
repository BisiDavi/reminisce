import * as postRoutes from './posts'

 const AppRoutes = (_app:any) => {
  _app.use('/posts',  postRoutes)
}

export default AppRoutes;