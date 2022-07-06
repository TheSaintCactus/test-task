import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { getQuestion, getQuestions, setQuestionsArray } from "../../redux/actions"
import { state } from "../../redux/selectors"

const SortWrapper = styled.div`
display: flex;
width: 250px;

margin-left: 10px;
    margin-bottom: 10px;
    align-self: start;  
`

const SelectStyled = styled.select`
    
    appearance: none;
    border: none;
    padding: 5px;
    color: #0393cc;
    padding-right: 40px;
    border-radius: 10px;
    background: 90% no-repeat;
    background-size: 15px;
    background-color: #e7e6e6;
    background-image: url("data:image/png;base64,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");
    &:hover {
        cursor: pointer
    }
    
`

const SortButton = styled.button`
        
        width: 30px;
         height: 25px;
   border: none;
   &:hover {
        cursor: pointer
    }
    margin-left: 15px;
   background: 50% no-repeat;
    background-size: 15px;
   border-radius: 10px;
   background-color: #e7e6e6;
   background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAFUklEQVR4nO2b729TVRzGn3NuCWbiRtsNcawloxUGuHYCskKWOY2+NL5A3/jS6EYCYyBdCUpEoyZayq+BLwZ74R/gH2BCFNQE6GBKC+KMa9N1DVHYbccWt5Xt3uOLtqzbWntvf9xjwn1eLbd35zzPp9/Te+695wC6dD3RIjw63XlqYm9sgn32YJKaAaCuWhbra9ixm4dN/Vp70RxAi1c8FYwJh2S2+DglgNPKTv7qNrq19KMpgJ0nJhoD9xBKzoPsaJTgsqcoXPuTYCgiYKUBbLuNNV7dbxzVyhPVqiMASAJHkvMgFhPDa1tlrFrJsGolw+tbZTSYZCTnQaan2REtPWkK4NEcswNAg2lJ/RPAYkr9mZwnG7X0pCkABmYAAIGyZZ9ljmXO0UqaAvg/SgfA2wBv6QB4G+AtHQBvA7ylA+BtgLd0ALwN8JYOgLcB3tIB8DbAWzoA3gZ4SwfA2wBv6QB4G+AtHQBvA7ylA+BtgLdUv4VxnZp84+Gs1PNIZs8+ZUBoVRX70H/AfLcS5grJeXJ24/Ts9PHkPG00gN2TCT0R+bjGr6YNVQA2fRH/+XpEbgMjSL9YfmGFgDdbvKLvlsfcq6atUvWiL+G7M5b8YE6i6TfcBCBsT8Nx8dvYp+a3lbajeAg4vhK/+eMv2gYGrDcztG6Q0WBimJOAwJjgdnrjmi1ucHrj/bdGyeE5iZF1RoYdjRLqjQxgQCwuvLX+k/jnSttSXAGjIn0HAHZukPHqFunx8WsjFD8OCwiO0U6nN46Ax9SlKo1KOb3x/uAY7WQAXm6SsMsmp4qRybj0G8VQRED8H3IQwDEl7SmqgPaTouXhDFkBALvs8qLPdtlldDRJYEAGQsUqITt8R5OU8pJZ4kEWvE3NkqfRLVYraVMRAMqSM5l+lr/YBlwaQFga3rXki8gWAQDD9JySdhUBuOKuH6+rZlMA4A/l/heXXUbH5spAWBR+c/7w18MCAKD2GZbAacuMkrYV/whajNJHlKYAXB/JA8FWfgjLwtvyhB+huBmmoBSwGNlRpe0rBjDkrj3XvE6+QAhwZVjQBILS8P4QxZVhAQRAcwP6f+lVvtxO1Uww4DF1OazyOZqGcHVEyHmey5a6UmQgOLziRTX9AIDTF+8LxlLh25vkvOEHwxSXf0+Ht0gDgd7Ve9X0o3oqHHCbDjRbpD5KgJ+GaV4ImcslA3B7THhPDQSnL94XjNJuxlLhd9ulnOcNhil+uLsQPugxv682T273BfT3Je93jj2e+vtTZPvoOIGB5lj5BWCdkcFAgcg4xf1Jug0Ea6YfkRVWM4PVvPj8qEgQFSlAsCZyn7YtutTlkD+08M07LPKFoMfcWUyWom+GAh5TlyNdCf85HOwLlTA+RaoKtTs+Raoel32e8MvKvoTJV0l3g4Fec4/S4fDKltxlnEvtmypb9tkq+XY40Gvu2drAviZpCPmuDq0bUpMlgQBra5YPl7U1DAJJlf3u53OH92eHt8oXSw0PlHGtcLM3fv5OjO5jrPBMrRj5wxSXs8P3mooa80tVtgcitz2m/U4rO1voN6EYDWaHt0gD5QoPVGC1eIsvcSYYJT1ygUuYUpV7zC9VRZbLlwtCpcMDFdwvUCoELcIDFd4wUSwErcIDFX4qfMttPOiwSmcLzROydUPD8IBGW2ZafOKZYFQoWAk3whTfaxge0HDPUCEIPMIDGm+acvrifbejtFtmwEuNMlptEkAIBkMUg2Fa9kmOEmm+bW6bL3E+EMU+iS3umtLUwwy19/OlisvGydbTiXdjCXz5YJLUMhDUVcvic0ZydOjQ6gEefnTpeoL1LzJKicRgwo0BAAAAAElFTkSuQmCC');
`
const SortButtonDown = styled(SortButton)`
    
   
`
const SortButtonUp = styled(SortButton)`
transform: rotate(180deg);
`


 const SortButtons = () => {
    const dispatch = useDispatch()
    const { query } = useSelector(state)

    const [direction, setDirection] = useState('desc')
    const [method, setMethod] = useState('activity')
    const firstRenderRef = useRef(true);




    const onChangeSelect = (e) => {
      setMethod(e.target.value)
    }
  
  

  useEffect(() => {
    console.log(method, direction)
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
    if (query) {
     dispatch(getQuestions(query, method, direction))
    }}
    
  }, [method, direction])


    return <SortWrapper>
    <SelectStyled onChange={onChangeSelect} value={method}>
        
    <option value='activity'>by activity</option>
    <option value='votes'>by votes</option>
    <option value='creation'>by creation date</option>
    <option value='relevance'>by relevance</option>
    </SelectStyled>
    {!(method === 'relevance') && <><SortButtonUp onClick={() => setDirection('asc')}/>
    <SortButtonDown  onClick={() => setDirection('desc')}/></>}
    
</SortWrapper>
}

export const MemoizedSortButtons = React.memo(SortButtons)