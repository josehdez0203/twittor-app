import './basic_layout.scss';
import { Container, Row, Col } from 'react-bootstrap';
import LeftMenu from '../../components/left-menu/Left_menu';
const BasicLayout = (props) => {
  console.log('props', props);
  const { setCheckLogin, className, children } = props;
  return (
    <Container className={`basic_layout ${className}`}>
      <Row>
        <Col xs={3} className="basic-layout__menu">
          <LeftMenu setCheckLogin={setCheckLogin} />
        </Col>
        <Col xs={9} className="basic-layout__content">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default BasicLayout;
