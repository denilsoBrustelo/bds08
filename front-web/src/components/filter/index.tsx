import './style.css';
import 'flatpickr/dist/themes/material_green.css';
import flatpickrLib from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { useEffect, useState } from 'react';
import { FilterData, Store } from '../../types';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { makeRequest } from '../../utils/request';

flatpickrLib.localize(Portuguese);

type Props = {
  onSubmitFilter: (data: FilterData) => void;
};

function Filter({ onSubmitFilter }: Props) {
  const [selectStores, setSelectStores] = useState<Store[]>([]);

  const { handleSubmit, setValue, getValues, control } = useForm<FilterData>();

  const handleChangeStore = (value: Store) => {
    setValue('store', value);

    const obj: FilterData = {
      store: getValues('store')
    };
    onSubmitFilter(obj);
  };

  const onSubmit = (formData: FilterData) => {
    onSubmitFilter(formData);
  };

  useEffect(() => {
    makeRequest({ url: '/stores' }).then((response) => {
      setSelectStores(response.data);
    });
  }, []);

  return (
    <div className="filter-container base-card">
      <form onSubmit={handleSubmit(onSubmit)} className="filter-form">
        <Controller
          name="store"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={selectStores}
              isClearable
              placeholder="Lojas"
              classNamePrefix="filter-input"
              onChange={(value) => handleChangeStore(value as Store)}
              getOptionLabel={(store: Store) => store.name}
              getOptionValue={(store: Store) => String(store.id)}
            />
          )}
        />
      </form>
    </div>
  );
}

export default Filter;
