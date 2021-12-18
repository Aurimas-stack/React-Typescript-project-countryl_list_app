import './Country.css'

interface countryProvider {
    flag:string, 
    name: string, 
    region: string, 
    area: number
}

type Props = {
    data: countryProvider
}

export const Country: React.FC<Props> = (props) => {
    return (
        <div className="country">
            <div className='flag-container'>
                <img className='flag' src={props.data.flag} alt='flag' />
            </div>
            <div className='country-info'>
                <p className='info'><span className='info-name'>Country: </span>{props.data.name}</p>
                <p className='info'><span className='info-name'>Region: </span>{props.data.region}</p>
                <p className='info'><span className='info-name'>Area: </span>{props.data.area}<span> km²</span></p>
            </div>
        </div>
    )
}