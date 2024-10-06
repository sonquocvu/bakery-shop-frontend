import {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const CommonDataContext = createContext();

export const CommonDataProvider = ({children}) => {
    
    const [commonCategories, setCommonCategories] = useState(null);
    const [commonProductMap, setCommonProductMap] = useState(null);
    const [commonLoading, setCommonLoading] = useState(true);
    const [commonError, setCommonError] = useState(null);

    const baseUrl = process.env.REACT_APP_SERVER_URL;
    const categoryKey = process.env.REACT_APP_CATEGORY_KEY;
    const homePageDataKey = process.env.REACT_APP_HOME_PAGE_DATA_KEY;
    
    useEffect(() => {

        setCommonLoading(true);

        const categoryData = sessionStorage.getItem(categoryKey);
        const homeData = sessionStorage.getItem(homePageDataKey);

        const maybeFetchGeneralData = async () => {

            if (categoryData) {
                try {
                    const parsedCategories = JSON.parse(categoryData);
                    if (parsedCategories) {
                        setCommonCategories(parsedCategories);
                    } else {
                        fetchCategories();
                    }                                 
                } catch (error) {
                    fetchCategories();
                }
                
            } else {
                fetchCategories();
            }

            if (homeData) {
                try {
                    const parsedHomeData = JSON.parse(homeData);
                    if (parsedHomeData) {
                        setCommonProductMap(parsedHomeData);
                    } else {
                        fetchHomeData();
                    }
                } catch (error) {
                    fetchHomeData();
                }
                
            } else {
                fetchHomeData();
            }

            setCommonLoading(false);
        };

        const fetchCategories = async () => {
            try {
                const url = baseUrl + '/common/category';
                const response = await axios.get(url);

                const m_categories = response.data;
                sessionStorage.setItem(categoryKey, JSON.stringify(m_categories));
                setCommonCategories(m_categories);
            } catch (error) {
                setCommonError("Không tải được dữ liệu, vui lòng làm mới trang web");
            }
        };

        const fetchHomeData = async () => {
            try {
                const url = baseUrl + '/common/home';
                const response = await axios.get(url);

                const products = response.data;
                sessionStorage.setItem(homePageDataKey, JSON.stringify(products));
                setCommonProductMap(products);
            } catch (error) {
                setCommonError("Không tải được dữ liệu, vui lòng làm mới trang web");
            }
        }

        maybeFetchGeneralData();

    }, []);

    return (
        <CommonDataContext.Provider value={{commonProductMap, commonCategories, commonLoading, commonError}}>
            {children}
        </CommonDataContext.Provider>
    );
}