import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../constant/Colors'
import moment from 'moment';
import { GetPreviousDateRangeToDisplay } from '../../service/ConvertDateTime';
import { getLocalStorage } from '../../service/Storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import MedicationCardItem from '../../components/MedicationCardItem';


export default function History() {
  const [dateRange, setDateRange] = useState();
  const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));
  const [loading, setLoading] = useState(false);
  const [medList, setMedList] = useState([]);
  useEffect(() => {
    GetDateList()
    GetMedicationLiat(selectedDate)
  }, [selectedDate])
  const GetDateList = () => {
    const date = GetPreviousDateRangeToDisplay();
    setDateRange(date);
  }
  const GetMedicationLiat = async (selectedDate) => {
    setLoading(true);
    const user = await getLocalStorage('userDetail');
    setMedList([]);
    try {
      const q = query(collection(db, "medication"),
        where("userEmail", "==", user?.email),
        where('dates', 'array-contains', selectedDate));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log('docID' + doc.id + '==>', doc.data())
        setMedList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }
  return (
    <FlatList
      data={[]}
      style={{
        backgroundColor:'white',
        height:'100%'
      }}
      ListHeaderComponent={
        <View style={styles.mainContainer}>
          <Image source={require('./../../assets/images/med-history.png')}
            style={styles.imgBanner}
          />
          <Text style={styles.header}>Medication History</Text>
          <FlatList
            data={dateRange}
            horizontal
            style={{ marginTop: 15 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={[styles.dateGroup, { backgroundColor: item?.formattedDate == selectedDate ? Colors.PRIMARY : Colors.LIGHT_GRAY_BORDER }]}
                onPress={() => {
                  setSelectedDate(item.formattedDate);
                  //  GetMedicationLiat(item.formattedDate);
                }}
              >
                <Text style={[styles.day, { color: item?.formattedDate == selectedDate ? 'white' : 'black' }]}>{item.day}</Text>
                <Text style={[styles.date, { color: item?.formattedDate == selectedDate ? 'white' : 'black' }]}>{item.date}</Text>
              </TouchableOpacity>
            )}
          />
          {medList.length > 0 ? <FlatList
            data={medList}
            onRefresh={() => GetMedicationLiat(selectedDate)}
            refreshing={loading}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => router.push({
                pathname: '/action-modal',
                params: {
                  ...item,
                  selectedDate: selectedDate
                }
              })}>
                <MedicationCardItem medicine={item} selectedDate={selectedDate} />
              </TouchableOpacity>
            )}
          /> : <Text style={{
            fontSize: 25,
            padding: 30,
            fontWeight: 'bold',
            color: Colors.GRAY,
            textAlign: 'center'
          }}>No History</Text>}
        </View>
      } />
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    padding: 25,
    backgroundColor: 'white',
  },
  imgBanner: {
    width: '100%',
    height: '200',
    borderRadius: 15
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20
  },
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