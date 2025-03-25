// src/components/movies/MovieTable.tsx
import React from 'react';
import { Movie } from '../../types/types';
import Table from '../Table/Table';

interface Props {
    data: Movie[];
}

const MovieTable: React.FC<Props> = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <Table data={data} countries={[]} onCountryChange={() => {}} isAssociated={false} />
        </div>
    );
};

export default MovieTable;
