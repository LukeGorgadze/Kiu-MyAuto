import { Ripple } from 'react-css-spinners'
interface Props {
    col: string
}
const Loader: React.FC<Props> = ({ col }) => (
    <>
        {/* Pass props like color and size (more in demo) */}
        <Ripple
            color={col}
            size={100}
            thickness={7}
        />

    </>
)

export default Loader;