import styled from "styled-components";
import img from "../../Assets/Images/welcome-img.jpg";

export const BackgroudImage = styled.div`
    object-fit: contain;
    background-position: center;
    height: 100%;
    background-size: cover !important;
    background-repeat: no-repeat;
    background:url(${img}); 
`;