import { Box, Modal } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    component: any;
    setRoute?: any;
}

const CustomModal: React.FC<Props> = ({open, setOpen, setRoute, component:Component}) => {
    const { userInfo } = useSelector((state: any) => state.auth);
  return (
    <div>
        <Modal
        open={open}
        onClose={() => userInfo && setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[420px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black"
            >
                <Component setOpen={setOpen} setRoute={setRoute} /> 
            </Box>
        </Modal>
    </div>
  )
}

export default CustomModal