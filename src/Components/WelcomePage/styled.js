import styled from "styled-components";
import img from "../../Assets/Images/Kent-RO-Water-Purifier.png";

export const BackgroudImage = styled.div`
    object-fit: contain;
    background-position: center;
    height: calc(100% - 50px);
    background-size: cover !important;
    background-repeat: no-repeat;
    background:url(${img}); 
`;