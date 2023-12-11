import React from 'react'
import '../styles/collections.css'
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import cas1 from '../components/CollectionsImages/col1.bmp'
import cas2 from '../components/CollectionsImages/col2.jpg'
import cas3 from '../components/CollectionsImages/col4.bmp'
import cas4 from '../components/CollectionsImages/col3.jpg'
import cas5 from '../components/CollectionsImages/col5.bmp'
import cas6 from '../components/CollectionsImages/col6.bmp'
import Helmet from '../components/Helmet/Helmet';

const Categories = () => {
  return (
    <Container> 
      <Helmet title="Categories" />
      <Row className='top-text'>
        <Col lg-12>
          <br />
          <h2>Classic Collection</h2>
          <span>The daily outdoor outfit</span>
          <br /> <br />
          <p> A capsule that embraces Desert Neutrals with high fashion form and intricately chosen luxury materials. This world class collection is very comfortable and can be worn everywhere, everyday. </p>
          <br />
        </Col>
      </Row>
      <Row className='img-collections'>
        <Col lg-3>
          <Link to='/22'>
          <motion.img whileHover={{scale: 1.1}} src={cas1} alt=""/>
          <motion.img whileHover={{scale: 1.1}} src={cas2} alt=""/>
          </Link>
        </Col>
        <Col lg-6>
        <Link to='/13'>
          <motion.img whileHover={{scale: 1.1}} src={cas4} alt=""/>
          <motion.img whileHover={{scale: 1.1}} src={cas3} alt=""/>
          </Link>
        </Col>
        <Col lg-3>
        <Link to='/09'>
        <motion.img whileHover={{scale: 1.1}} src={cas5} alt=""/>
        <motion.img whileHover={{scale: 1.1}} src={cas6} alt=""/>
          </Link>
        </Col>
    </Row> <br />
  </Container>
  )
}

export default Categories