
import Cards from './components/Cards'
import Carousel from './components/Carousel'
import Footer from './components/Footer'
import Header from './components/Header'


function App() {
  return (
    <>

      <div className='d-flex flex-column min-vh-100 background-container'>

        <div className='background-overlay '></div>

        <Header />

        <main className='flex-fill'>
          <h2 className='text-center mb-0 animated-heading' >WHY BUY? <span className=' text-success highlight-text'> JUST RENTHIVE</span></h2>

          <div className='container-fluid p-0 m-0 d-flex justify-content-center mt-3 rounded'>
            <Carousel />

          </div>

          <Cards />

        

        </main>

        <Footer />

      </div>
    </>
  )
}

export default App
