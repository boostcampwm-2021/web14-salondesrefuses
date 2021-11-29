import React from 'react';
import { Filter, FilterWrapper } from '../style';

interface IListFilter {
    handleFilter: (e: React.MouseEvent) => void;
    select: string;
}

const ListFilter = ({ handleFilter, select }: IListFilter) => {
    return (
        <FilterWrapper>
            <div>
                <Filter select={select === 'Newest'} onClick={handleFilter}>
                    Newest
                </Filter>
            </div>
            <div>
                <Filter select={select === 'Deadline'} onClick={handleFilter}>
                    Deadline
                </Filter>
            </div>
        </FilterWrapper>
    );
};

export default ListFilter;
