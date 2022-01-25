import { Button, Row, Col } from 'antd';

const Sort = ({sortByStatus, sortingTasks}) => {
    return (
        <Row>
            <Col flex="auto">
                <Button onClick={() => sortByStatus("All")} >All</Button>
                <Button onClick={() => sortByStatus("Done")}>Done</Button>
                <Button onClick={() => sortByStatus("Undone")}>UnDone</Button>
            </Col>

            <Col>
                <div>Sort By Date</div>

                <Button onClick={() => sortingTasks('standart')}>▲</Button>
                <Button onClick={() => sortingTasks('reverse')}>▼</Button>
            </Col>
        </Row>
    )
}

export default Sort;