import 'react-quill/dist/quill.snow.css'
import 'antd/dist/antd.css'
import '../styles/globals.scss'
import '../styles/quill.css'
import {GlobalProvider} from '../contexts/global.context'
import {ArticleProvider} from '../contexts/article.context'


function MyApp({ Component, pageProps }) {
  return (
      <GlobalProvider>
        <ArticleProvider>
          <Component {...pageProps} />
        </ArticleProvider>
      </GlobalProvider>
  )
}

export default MyApp
