import { FontFamily } from 'interfaces';

export const initialRectStyle = {
    width: 100,
    height: 100,
    top: 0,
    left: 0,
    backgroundColor: 'black',
    zIndex: 100,
    position: 'absolute' as 'absolute',
};

export const initialTextStyle = {
    width: 100,
    height: 100,
    top: 0,
    left: 0,
    backgroundColor: 'none',
    zIndex: 100,
    position: 'absolute' as 'absolute',
    align: 'LEFT' as 'LEFT',
    fontSize: 14,
    fontFamily: 'Montserrat' as FontFamily,
};

export const initialImageStyle = {
    width: 'auto',
    height: 'auto',
    top: 0,
    left: 0,
    backgroundColor: 'none',
    zIndex: 100,
    position: 'absolute' as 'absolute',
};
