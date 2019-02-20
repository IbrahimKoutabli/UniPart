import React from 'react'
import Styled from '@emotion/styled'

const Title = Styled.span({
	marginBottom: "30px",
	fontSize: "22px"
})

interface Props {
    text : string
}

const title = (props : Props) => {
    return (
        <Title>{props.text}</Title>
    )
}

export default title;