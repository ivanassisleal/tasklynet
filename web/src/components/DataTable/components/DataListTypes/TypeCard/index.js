import React from 'react';
import { Card, CardBody } from 'reactstrap';

const CardItem = ({ row }) => {
    return (
        <Card
            {...row.getRowProps()}
            style={{
                border: 'solid 1px #f3f3f3',
                borderRadius: '10px',
            }}
        >
            <CardBody>
                {row.cells.map((cell) => {
                    return (
                        <div
                            {...cell.getCellProps()}
                            className={`${cell.column.display}`}
                        >
                            <div style={{ marginTop: '10px' }}>
                                <strong>{cell?.column?.Header}</strong>
                            </div>
                            {cell.render('Cell')}
                        </div>
                    );
                })}
            </CardBody>
        </Card>
    );
};

const TypeCard = ({ includePagination, page, rows, prepareRow, loading }) => {
    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <>
            {includePagination
                ? page.map((row) => {
                      prepareRow(row);
                      return <CardItem row={row} key={row.index} />;
                  })
                : rows.map((row) => {
                      prepareRow(row);
                      return <CardItem row={row} key={row.index} />;
                  })}

            {loading && (
                <div className="text-center m-4">
                    <div style={style}>
                        <i
                            className="fa fa-refresh fa-spin fa-2x  mt-3 mb-3"
                            style={{ marginRight: '10px' }}
                        />{' '}
                        Carregando...
                    </div>
                </div>
            )}

            {!loading && rows.length === 0 && (
                <div className="text-center">
                    <div className="mt-3 mb-3">Nenhum registro encontrado</div>
                </div>
            )}
        </>
    );
};

export default TypeCard;
