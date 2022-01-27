import { Button, Row, Col } from 'antd';

const Sort = ({ sortByStatus, sortByDate }) => {
    return (
        <Row align="middle" justify="space-between">
            <Col>
                <Button shape="round" type="primary" onClick={() => sortByStatus("all")}>All</Button>
                <Button shape="round" type="primary" onClick={() => sortByStatus("done")}>Done</Button>
                <Button shape="round" type="primary" onClick={() => sortByStatus("undone")}>UnDone</Button>
            </Col>

            <Col>
                <Row align="center" justify="center" gutter="5">
                    <div>Sort By Date</div>

                    <Button shape="round" type="primary" shape="circle" onClick={() => sortByDate('asc')}>▲</Button>
                    <Button shape="round" type="primary" shape="circle" onClick={() => sortByDate('desc')}>▼</Button>
                </Row>
            </Col>
        </Row>
    )
}

export default Sort;