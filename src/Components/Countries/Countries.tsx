import './Countries.css';
import {Country} from '../Country/Country';
import { Pagination } from '../Pagination/Pagination';

interface dataProvider {
    flag: string,
    name: string,
    region: string,
    area: number
}

type Props = {
    data: Array<dataProvider>
}

export const Countries:React.FC<Props> = (props) => {
    return (
        <div className='country-container'>
            {
                props.data.length > 0 ? (
                    <>
                    <Pagination data={props.data} 
                        RenderComponent={Country} 
                        pageLimit={8} 
                        dataLimit={10}/>
                    </>
                ) : null
            }
        </div>
    )
}