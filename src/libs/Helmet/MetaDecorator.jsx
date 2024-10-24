import {Helmet} from 'react-helmet';

const MetaDecorator = ({title,description})=>{
    return (
        <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <link rel="icon" href="./fruit-shop.png" />
      </Helmet>
    )
};

export default MetaDecorator;