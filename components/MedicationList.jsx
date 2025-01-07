import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetDateRangeToDisplay } from '../service/ConvertDateTime';
import Colors from '../constant/Colors';
import moment from 'moment';
import { getLocalStorage } from '../service/Storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import MedicationCardItem from './MedicationCardItem';
import EmptyState from './EmptyState';

export default function MedicationList() {
    const [medList, setMedList] = useState([]);
    const [dateRange, setDateRange] = useState();
    const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));
    const [loading,setLoading]=useState(false);
    useEffect(() => {
        GetDateRangeList();
        GetMedicationLiat(selectedDate);
    }, [])
    const GetDateRangeList = () => {
        const dateRange = GetDateRangeToDisplay();
        setDateRange(dateRange);
    }
    const GetMedicationLiat=async(selectedDate)=>{
        setLoading(true);
        const user=await getLocalStorage('userDetail');
        setMedList([]);
        try{
            const q = query(collection(db, "medication"),
            where("userEmail", "==", user?.email),
            where('dates','array-contains',selectedDate));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((doc) => {
                console.log('docID'+doc.id+'==>',doc.data())
                setMedList((prev) => [...prev, doc.data()]);
            });
            setLoading(false);
        }catch(e){
            console.log(e);
            setLoading(false);
        }
    }
    return (
        <View style={{
            marginTop: 25
        }}>
            <Image source={require('./../assets/images/medication.jpeg')}
                style={{
                    width: '100%',
                    height: 250,
                    borderRadius: 15
                }}
            />

            <FlatList
                data={dateRange}
                horizontal
                style={{ marginTop: 15 }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={[styles.dateGroup, { backgroundColor: item?.formattedDate == selectedDate ? Colors.PRIMARY : Colors.LIGHT_GRAY_BORDER }]}
                        onPress={() => {setSelectedDate(item.formattedDate);
                            GetMedicationLiat(item.formattedDate);
                        }}
                    >
                        <Text style={[styles.day, { color: item?.formattedDate == selectedDate ? 'white' : 'black' }]}>{item.day}</Text>
                        <Text style={[styles.date, { color: item?.formattedDate == selectedDate ? 'white' : 'black' }]}>{item.date}</Text>
                    </TouchableOpacity>
                )}
            />

            {medList.length >0? <FlatList 
                data={medList}
                onRefresh={()=>GetMedicationLiat(selectedDate)}
                refreshing={loading}
                renderItem={({item,index}) => (
                    <TouchableOpacity >
                    <MedicationCardItem medicine={item} />
                    </TouchableOpacity>
                )}
            />:<EmptyState/>}

        </View>
    )
}

const styles = StyleSheet.create({
    dateGroup: {
        padding: 15,
        backgroundColor: Colors.LIGHT_GRAY_BORDER,
        display: 'flex',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 15
    },
    day: {
        fontSize: 20,
    },
    date: {
        fontSize: 26,
        fontWeight: 'bold'
    }
})