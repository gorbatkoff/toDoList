import { Button, Row, Col } from 'antd';

const Sort = ({ sortByStatus, sortingTasks }) => {
    return (
        <Row align="middle" justify="space-between">
            <Col>
                <Button shape="round" type="primary" onClick={() => sortByStatus("All")}>All</Button>
                <Button shape="round" type="primary" onClick={() => sortByStatus("Done")}>Done</Button>
                <Button shape="round" type="primary" onClick={() => sortByStatus("Undone")}>UnDone</Button>
            </Col>

            <Col>
                <Row align="center" justify="center" gutter="5">
                    <div>Sort By Date</div>

                    <Button shape="round" type="primary" shape="circle" onClick={() => sortingTasks('standart')}>▲</Button>
                    <Button shape="round" type="primary" shape="circle" onClick={() => sortingTasks('reverse')}>▼</Button>
                </Row>
            </Col>
        </Row>
    )
}

export default Sort;