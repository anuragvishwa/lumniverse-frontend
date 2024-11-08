'use client';

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Button, Input, Text, Title, Textarea } from 'rizzui';
import { Form } from '@core/components/form';
import cn from '@core/utils/class-names';
import {
  CategoryFormInput,
  categoryFormSchema,
} from '@/validators/create-category.schema';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import { setClickedSession } from '@/redux/slices/getStocksPriceSlice';
import { setIsEdit } from '@/redux/slices/extraSlices';
import {
  setEditFrequencyPenalty,
  setEditMaxTokens,
  setEditModel,
  setEditPresencePenalty,
  setEditStopSlider,
  setEditTemperature,
  setEditTopP,
} from '@/redux/slices/editParamsSlice';
import {
  setEditInputValue,
  setEditSelectedOption,
  setEditUserInput,
  setImageCards,
} from '@/redux/slices/editChatData';
import { setCards } from '@/redux/slices/editChat';
import {
  setEditGetStocksData,
  setGetStocksCards,
} from '@/redux/slices/getEditStocksSlice';
import { setEditToolsData, setToolsCards } from '@/redux/slices/editTools';
import {
  setEditScheduleData,
  setScheduleCards,
} from '@/redux/slices/editScheduleMeeting';
import { setNewToolCards } from '@/redux/slices/editNewTool';
import axios from 'axios';
import { loadPrompts, loadVersions } from '@/redux/slices/createPrompts';
import {
  setSelectedOptionsData,
  setUserInputData,
} from '@/redux/slices/promptsCardSlice';
import {
  setAllConditionsTrue,
  setEditAllConditionsTrue,
} from '@/redux/slices/isFilter';
import { useSession } from 'next-auth/react';
import {
  createNewConfig,
  fetchTraincoreApiKeys,
  updateModelProviderKeys,
} from '@/redux/slices/configSlice';
import { RootState } from '@/redux/store';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const token = process.env.NEXT_PUBLIC_API_TOKEN;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

function HorizontalFormBlockWrapper({
  title,
  description,
  children,
  className,
  isModalView = true,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
  isModalView?: boolean;
}>) {
  return (
    <div
      className={cn(
        className,
        isModalView ? '@5xl:grid @5xl:grid-cols-6' : ' '
      )}
    >
      {isModalView && (
        <div className="col-span-2 mb-6 pe-4 @5xl:mb-0">
          <Title as="h6" className="font-semibold">
            {title}
          </Title>
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        </div>
      )}

      <div
        className={cn(
          'grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5',
          isModalView ? 'col-span-4' : ' '
        )}
      >
        {children}
      </div>
    </div>
  );
}

// main category form component for create and update category
export default function KeyModalView({
  category,
  title,
  isModalView = true,
  orgId,
  orgName,
  name,
  link,
}: {
  isModalView?: boolean;
  category?: CategoryFormInput;
  orgName: string;
  orgId: string;
  title: string;
  name: string;
  link: string;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [model, setModel] = useState('Model');
  const [commitMessage, setCommitMessage] = useState('');
  const dispatch: any = useDispatch();
  const generateUUID = () => uuidv4();
  const handleCommitMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const trimmedValue = event.target.value.trim();
    setCommitMessage(trimmedValue);
  };

  const { closeModal } = useModal();

  const { data: session, status } = useSession();
  const userId: any = localStorage.getItem('userId');
  const traincoreapiKeys = useSelector((state: any) => state.configs);
  const trainkoreApiKeys = useSelector(
    (state: RootState) => state.configs.traincoreapiKeys
  );
  console.log(traincoreapiKeys, name, trainkoreApiKeys, 'put Response:');
  const handleMessage = async () => {
    setLoading(true);
    const configData = {
      session,
      orgId,
      orgName,
      userId,
      name,
      commitMessage,
    };
    try {
      const existingConfigResponse = await axiosInstance.get(
        `/api/configs/user/${userId}`
      );

      console.log(existingConfigResponse, 'get response');

      const existingConfig = existingConfigResponse.data;

      if (!existingConfig || existingConfig.length === 0) {
        const response = await dispatch(createNewConfig(configData));
        console.log('post Response:', response.payload);
        toast.success(`${name} API Key saved successfully!`);
      } else {
        const configId = existingConfig.configId;
        console.log(commitMessage, 'put api calling');

        const response = await dispatch(
          updateModelProviderKeys({ configId, name, commitMessage })
        );
        console.log('put Response:', response);
        toast.success(`${title} API Key updated successfully!`);
      }

      closeModal();
    } catch (error: any) {
      if (error.response.status === 404) {
        const response = await dispatch(createNewConfig(configData));
        console.log('post Response:', response.data);
        toast.success(`API Key saved successfully!`);
      } else {
        toast.error('Failed to save API Key.');
      }
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const onSubmit: any = (data: any) => {
    setLoading(true);
    setTimeout(() => {
      setReset({
        name: '',
        slug: '',
        type: '',
        parentCategory: '',
        description: '',
        images: '',
      });

      toast.success(`${title} API Key saved successfully!`);
    }, 600);
  };

  console.log(commitMessage, 'name');

  return (
    <Form<CategoryFormInput>
      validationSchema={categoryFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: category,
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ register, control, getValues, setValue, formState: { errors } }) => (
        <>
          <div className="flex-grow pb-10">
            <div
              className={cn(
                'grid grid-cols-1',
                isModalView
                  ? 'grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12 [&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11'
                  : 'gap-5'
              )}
            >
              <HorizontalFormBlockWrapper
                title={'Add new category:'}
                description={'Edit your category information from here'}
                isModalView={isModalView}
              >
                {name === 'openai_azure' ? null : (
                  <div className="col-span-2 flex justify-between">
                    <Text as="span" className="text-sm text-gray-700">
                      You can get your API key from{' '}
                      <a
                        href={link}
                        target="_blank"
                        className="font-medium text-blue-600 underline hover:text-blue-800 hover:no-underline"
                      >
                        here
                      </a>
                    </Text>
                  </div>
                )}

                {name === 'openai_azure' ? (
                  <div className="col-span-2 mt-2">
                    <Controller
                      control={control}
                      name="description"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          value={value}
                          onChange={(e) => {
                            onChange(e);
                          }}
                          placeholder={`Your ${title} API endpoint`}
                          label="Endpoint"
                          className="[&>.ql-container_.ql-editor]:min-h-[100px]"
                          labelClassName="text-sm text-gray-700 dark:text-gray-600 mb-1.5"
                        />
                      )}
                    />
                  </div>
                ) : null}

                <div className="col-span-2 mt-2">
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <Textarea
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                          handleCommitMessageChange(e);
                        }}
                        placeholder={`Your ${title} API Key`}
                        label="API Key"
                        className="[&>.ql-container_.ql-editor]:min-h-[100px]"
                        labelClassName="text-sm text-gray-700 dark:text-gray-600 mb-1.5"
                      />
                    )}
                  />
                </div>
              </HorizontalFormBlockWrapper>
            </div>
          </div>

          <div
            className={cn(
              'sticky bottom-0 z-40 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col',
              isModalView ? '-mx-10 -mb-7 px-10 py-5' : 'py-1'
            )}
          >
            <Button
              type="submit"
              onClick={handleMessage}
              isLoading={isLoading}
              disabled={!commitMessage}
              className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              Setup
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
