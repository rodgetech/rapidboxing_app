import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Input, Button, Select, Text, CheckBox} from 'react-native-ui-kitten';

const validationSchema = Yup.object().shape({
  link: Yup.string().required("Link can't be empty"),
  price: Yup.number()
    .typeError('Must be a valid number')
    .min(1, 'Price has to be greater than 0')
    .required("Price can't be blank"),
  quantity: Yup.number()
    .min(1, "Quantity can't be less than 1")
    .required("Quantity can't be empty")
    .typeError('Must be a valid number'),
  extraPounds: Yup.number().typeError('Must be a valid number'),
  shippingRate: Yup.string().required('You must select a shipping rate'),
});

export default (Form = ({rates, createLineItem}) => (
  <Formik
    enableReinitialize
    validationSchema={validationSchema}
    initialValues={{
      details: '',
      link: '',
      quantity: '1',
      price: '',
      shippingRate: '',
      extraPounds: '0',
      localPickup: false,
    }}
    onSubmit={(values, {resetForm}) => createLineItem(values, resetForm)}>
    {({
      handleChange,
      handleBlur,
      handleSubmit,
      values,
      errors,
      touched,
      setFieldValue,
    }) => (
      <React.Fragment>
        <Input
          value={values.link}
          label="Link"
          labelStyle={styles.label}
          onChangeText={handleChange('link')}
          onBlur={handleBlur('link')}
          style={{marginBottom: 14}}
          status={touched.link && errors.link && 'danger'}
          caption={errors.link && touched.link && errors.link}
          multiline
        />

        <Input
          value={values.price}
          label="USD Price"
          labelStyle={styles.label}
          onChangeText={handleChange('price')}
          onBlur={handleBlur('price')}
          style={{marginBottom: 14}}
          status={touched.price && errors.price && 'danger'}
          caption={errors.price && touched.price && errors.price}
          keyboardType="numbers-and-punctuation"
        />

        <Input
          keyboardType="numbers-and-punctuation"
          defaultValue={values.quantity}
          label="Quantity"
          labelStyle={styles.label}
          onChangeText={handleChange('quantity')}
          onBlur={handleBlur('quantity')}
          style={{marginBottom: 14}}
          status={touched.quantity && errors.quantity && 'danger'}
          caption={errors.quantity && touched.quantity && errors.quantity}
        />

        <Input
          value={values.details}
          label="Details"
          labelStyle={styles.label}
          onChangeText={handleChange('details')}
          onBlur={handleBlur('details')}
          style={{marginBottom: 14}}
          multiline
        />

        <Select
          keyExtractor="id"
          selectedOption={values.shippingRate}
          style={[styles.select]}
          data={rates}
          label="Shipping range"
          labelStyle={styles.label}
          onSelect={selectedOption =>
            setFieldValue('shippingRate', selectedOption)
          }
          controlStyle={[
            styles.controlStyle,
            touched.shippingRate && errors.shippingRate && styles.selectDanger,
          ]}
          textStyle={{fontWeight: 'normal'}}
        />
        {errors.shippingRate && touched.shippingRate && (
          <Text style={{fontSize: 12, color: '#FF3D71', width: '100%'}}>
            {errors.shippingRate}
          </Text>
        )}

        <Input
          keyboardType="numbers-and-punctuation"
          defaultValue={values.extraPounds}
          label="Additional Pounds"
          labelStyle={styles.label}
          onChangeText={handleChange('extraPounds')}
          onBlur={handleBlur('extraPounds')}
          style={{marginVertical: 14}}
          status={touched.extraPounds && errors.extraPounds && 'danger'}
          caption={
            errors.extraPounds && touched.extraPounds && errors.extraPounds
          }
        />

        <View
          style={{
            width: '100%',
          }}>
          <CheckBox
            textStyle={{fontSize: 17, fontWeight: 'normal'}}
            style={{
              marginTop: 4,
            }}
            text="Local Hialeah Pickup"
            checked={values.localPickup}
            onChange={nextChecked => setFieldValue('localPickup', nextChecked)}>
            style={styles.checkbox}
          </CheckBox>
        </View>

        <Button
          status="success"
          size="large"
          style={{width: '100%', marginTop: 30, marginBottom: 20}}
          onPress={handleSubmit}>
          Add to cart
        </Button>
      </React.Fragment>
    )}
  </Formik>
));

const styles = StyleSheet.create({
  select: {
    width: '100%',
    shadowOffset: {height: 0, width: 0}, // IOS
  },
  controlStyle: {
    shadowOpacity: 0,
    shadowOffset: {height: 0, width: 0}, // IOS
  },
  selectDanger: {
    borderColor: '#FF3D71',
    borderWidth: 1,
  },
  label: {
    color: '#000',
    fontSize: 16,
  },
  checkbox: {
    margin: 2,
  },
});
