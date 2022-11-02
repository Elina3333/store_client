import React from 'react';
import {Box, Pagination, Typography} from "@mui/material";
import {MetaData} from "../../models/pagination";

interface Props {
    metaData : MetaData;
    onPageChange :(page:number) => void;
}

const AppPagination = ({metaData,onPageChange} : Props) => {
    const {TotalCount,TotalPages,CurrentPage,PageSize} = metaData;
    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Displaying {(CurrentPage -1)*PageSize +1}-{CurrentPage*PageSize > TotalCount ? TotalCount :CurrentPage*PageSize} 0f {TotalCount} items
            </Typography>
            <Pagination
                color='secondary'
                size='large'
                count={TotalPages}
                page={CurrentPage}
            onChange={(e,page) => onPageChange(page)}/>
        </Box>
    );
};

export default AppPagination;