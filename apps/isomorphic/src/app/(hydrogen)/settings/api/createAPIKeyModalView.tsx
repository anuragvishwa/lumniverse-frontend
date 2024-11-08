'use client';

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Button, Input, Text, Title } from 'rizzui';
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
import { BiPlus } from 'react-icons/bi';
import { useSession } from 'next-auth/react';
import {
  createAPIModalKey,
  createNewConfig,
  fetchTraincoreApiKeys,
} from '@/redux/slices/configSlice';

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
export default function CreateAPIKeyModalView({
  category,
  orgName,
  orgId,
  isModalView = true,
}: {
  isModalView?: boolean;
  category?: CategoryFormInput;
  orgName: string;
  orgId: string;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [model, setModel] = useState('Model');
  const [commitMessage, setCommitMessage] = useState('');
  const dispatch: any = useDispatch();
  const generateUUID = () => uuidv4();
  const handleCommitMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommitMessage(event.target.value);
  };
  const { closeModal } = useModal();

  const { data: session, status } = useSession();
  const userId = localStorage.getItem('userId');
  const traincoreapiKeys = useSelector((state: any) => state.configs);
  console.log(traincoreapiKeys, 'put Response:');
  const handleMessage = async () => {
    console.log('from handleMessage');

    setLoading(true);
    const configData = {
      name: session?.user.name,
      email: session?.user.email,
      orgId: orgId,
      orgName: orgName,
      orgSlug: 'my-org',
      environment: 'production',
      userId: userId,
      role: 'admin',
      modelProviders: {},
      trainkoreApiKeys: [
        {
          name: commitMessage,
          secretKey: 'sk-zzzzzzzz',
          created: new Date(),
        },
      ],
      renewsOn: new Date().toISOString(),
    };

    try {
      const existingConfigResponse = await axiosInstance.get(
        `/api/configs/user/${userId}`
      );

      console.log(existingConfigResponse.status, 'get response');

      const existingConfig = existingConfigResponse.data;
      console.log(existingConfig, 'config existing');

      if (!existingConfig || existingConfig.length === 0) {
        const response = await dispatch(createNewConfig(configData));
        console.log('post Response:', response.data);
        toast.success(`API Key saved successfully!`);
      } else {
        const configId = existingConfig.configId;

        const response = await dispatch(
          createAPIModalKey({ configId, commitMessage })
        );
        console.log('put Response:', response);
        toast.success(`API Key updated successfully!`);
      }

      closeModal();
    } catch (error: any) {
      console.log(configData, error.response.status);
      if (error.response.status === 404) {
        const response = await dispatch(createNewConfig(configData));
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
    }, 600);
  };

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
                <div className="col-span-2 flex justify-between">
                  <Text as="span" className="text-sm text-gray-700">
                    API keys will be given the same access as an admin within
                    your org.
                  </Text>
                </div>

                <div className="col-span-2 mt-2">
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        size="sm"
                        variant="outline"
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                          handleCommitMessageChange(e);
                        }}
                        placeholder="Name (e.g. where it will be used)"
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
              size="sm"
              onClick={handleMessage}
              isLoading={isLoading}
              disabled={!commitMessage}
              className="flex w-full cursor-pointer items-center gap-2 text-xs"
            >
              <BiPlus className="h-4 w-4" /> Create
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
