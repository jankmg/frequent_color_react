import { HandleSubmitFunction, Reset } from "../../interface"
import ErrorMessage from "./error/error_message"
import ImageInputForm from "./image_input_form"
import SuccessMessage from "./success/success_message"

const AppContent = ({isError, isShowingColor, handleSubmit, color, reset}:{isError: boolean, isShowingColor: boolean, handleSubmit: HandleSubmitFunction, color: string, reset: Reset})=>{
    return <>{isError ? <ErrorMessage reset={reset}/> : <>{!isShowingColor ? <ImageInputForm handleSubmit={handleSubmit}/> : <SuccessMessage color={color} reset={reset} />
}</>}</>
}

export default AppContent