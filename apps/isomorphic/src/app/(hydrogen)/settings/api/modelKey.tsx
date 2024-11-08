'use client';

import { Text, Title } from 'rizzui';
import WidgetCard from '@core/components/cards/widget-card';
import {
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
  BarChart,
  XAxis,
  Bar,
} from 'recharts';
import { useMedia } from 'react-use';
import GoogleIcon from '@core/components/icons/google';
import { RiOpenaiFill } from 'react-icons/ri';
import { BsMicrosoft } from 'react-icons/bs';
import { SiAnthropic, SiAzurefunctions } from 'react-icons/si';
import { PiCoatHangerDuotone } from 'react-icons/pi';
import KeyModal from './keyModal';
import ThreeDotsPopOver from './threedotspopover';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';
import CreateAPIKeyModal from './createAPIKeyModal';
import { Button, Loader } from 'rizzui';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchTraincoreApiKeys } from '@/redux/slices/configSlice';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const token = process.env.NEXT_PUBLIC_API_TOKEN;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface ApiKey {
  _id: string;
  name: string;
  secretKey: string;
  created: string;
}

interface TrainkoreApiKeys {
  configId: string;
  trainkoreApiKeys: ApiKey[];
}

interface ModelProvider {
  key: string;
  added: string;
}

interface TrainkoreApiKey {
  name: string;
  secretKey: string;
  created: string;
}

interface Config {
  name: string;
  email: string;
  orgId: string;
  orgName: string;
  orgSlug: string;
  environment: string;
  userId: string;
  role: string;
  modelProviders: {
    openai: ModelProvider;
    anthropic: ModelProvider;
  };
  trainkoreApiKeys: TrainkoreApiKey[];
  renewsOn: string;
}

export default function ModelKey({
  className,
  orgName,
  orgId,
}: {
  className?: string;
  orgName: string;
  orgId: string;
}) {
  const isSM = useMedia('(max-width: 640px)', false);
  const isMobile = useMedia('(max-width: 767px)', false);
  const isTab = useMedia('(min-width: 768px)', false);
  const isLg = useMedia('(min-width: 1024px)', false);
  const is2XL = useMedia('(min-width: 1780px)', false);

  const [currentPlatform, setCurrentPlatform] = useState<string | null>(null);

  const userId = localStorage.getItem('userId');

  const dispatch = useDispatch();
  const trainkoreApiKeys = useSelector(
    (state: RootState) => state.configs.traincoreapiKeys
  );
  const status = useSelector((state: RootState) => state.configs.status);
  const error = useSelector((state: RootState) => state.configs.error);

  useEffect(() => {
    if (userId) {
      dispatch(fetchTraincoreApiKeys(userId) as any).then((res: any) =>
        console.log(res)
      );
    }
  }, [dispatch, userId]);

  function formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  return (
    <div className={className}>
      <div className="mb-4">
        <Title as="h4" className="text-lg font-semibold">
          API Keys
        </Title>
      </div>
      <WidgetCard
        title="Model provider keys"
        titleClassName="font-medium text-sm text-gray-800 mb-2.5 font-inter"
        description="Enable model providers for your organization by setting the keys here."
      >
        <div>
          <div className="mb-4 mt-8 grid grid-cols-[2fr_2fr_2fr_auto] items-center gap-4 border-b border-gray-200 pb-4 font-medium last:mb-0 last:border-0 last:pb-0">
            <Text
              as="span"
              className="text-sm text-gray-600 dark:text-gray-700"
            >
              Provider
            </Text>
            <Text as="span">Key</Text>
            <Text as="span">Added</Text>
            <Text as="span"></Text>
          </div>
          {/* {platforms.map((item) => {
            const platformKey = `${item.name
              .toLowerCase()
              .replace(/\s+/g, '_')}_api_key`;
            const savedKey = localStorage.getItem(platformKey);

            return ( */}
          <div className="mb-4 grid grid-cols-[2fr_2fr_2fr_auto] items-center gap-4 border-b border-gray-200 pb-4 last:mb-0 last:border-0 last:pb-0">
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700"
            >
              <RiOpenaiFill className="h-6 w-6 flex-shrink-0" />
              OpenAI
            </Text>
            {trainkoreApiKeys?.modelProviders?.openai?.key ? (
              <Text as="span" className="truncate">
                {`${trainkoreApiKeys?.modelProviders?.openai?.key.slice(
                  0,
                  2
                )}...........${trainkoreApiKeys?.modelProviders?.openai?.key.slice(
                  -6
                )}`}
              </Text>
            ) : (
              <KeyModal
                name="openai"
                title="OpenAI"
                icon={RiOpenaiFill}
                orgName={orgName}
                orgId={orgId}
                link="https://platform.openai.com/api-keys"
              />
            )}
            <Text as="span">
              {formatDate(trainkoreApiKeys?.modelProviders?.openai?.added)}
            </Text>
            <ThreeDotsPopOver
              configId={trainkoreApiKeys?.configId}
              name="openai"
              keyType="modelProvider"
            />
          </div>{' '}
          <div className="mb-4 grid grid-cols-[2fr_2fr_2fr_auto] items-center gap-4 border-b border-gray-200 pb-4 last:mb-0 last:border-0 last:pb-0">
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700"
            >
              <SiAnthropic className="h-6 w-6 flex-shrink-0" />
              Anthropic
            </Text>
            {trainkoreApiKeys?.modelProviders?.anthropic?.key ? (
              <Text as="span" className="truncate">
                {`${trainkoreApiKeys?.modelProviders?.anthropic?.key.slice(
                  0,
                  2
                )}...........${trainkoreApiKeys?.modelProviders?.anthropic?.key.slice(
                  -6
                )}`}
              </Text>
            ) : (
              <KeyModal
                name="anthropic"
                title="Anthropic"
                icon={SiAnthropic}
                orgName={orgName}
                orgId={orgId}
                link="https://console.anthropic.com/settings/keys"
              />
            )}
            <Text as="span">
              {formatDate(trainkoreApiKeys?.modelProviders?.anthropic?.added)}
            </Text>
            <ThreeDotsPopOver
              configId={trainkoreApiKeys?.configId}
              name="anthropic"
              keyType="modelProvider"
            />
          </div>{' '}
          <div className="pointer-events-none mb-4 grid grid-cols-[2fr_2fr_2fr_auto] items-center gap-4 border-b border-gray-200 pb-4 opacity-50 last:mb-0 last:border-0 last:pb-0">
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-400 dark:text-gray-500"
            >
              <PiCoatHangerDuotone className="h-6 w-6 flex-shrink-0" />
              Cohere
            </Text>
            {trainkoreApiKeys?.modelProviders?.cohere?.key ? (
              <Text as="span" className="truncate">
                {`${trainkoreApiKeys?.modelProviders?.cohere?.key.slice(
                  0,
                  2
                )}...........${trainkoreApiKeys?.modelProviders?.cohere?.key.slice(
                  -6
                )}`}
              </Text>
            ) : (
              <KeyModal
                name="cohere"
                title="Cohere"
                icon={PiCoatHangerDuotone}
                orgName={orgName}
                orgId={orgId}
                link="https://dashboard.cohere.com/api-keys"
              />
            )}
            <Text as="span">
              {formatDate(trainkoreApiKeys?.modelProviders?.cohere?.added)}
            </Text>
            <ThreeDotsPopOver
              configId={trainkoreApiKeys?.configId}
              name="cohere"
              keyType="modelProvider"
            />
          </div>
          <div className="pointer-events-none mb-4 grid grid-cols-[2fr_2fr_2fr_auto] items-center gap-4 border-b border-gray-200 pb-4 opacity-50 last:mb-0 last:border-0 last:pb-0">
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-400 dark:text-gray-500"
            >
              <SiAzurefunctions className="h-6 w-6 flex-shrink-0" />
              Azure OpenAI
            </Text>
            {trainkoreApiKeys?.modelProviders?.openai_azure?.key ? (
              <Text as="span" className="truncate">
                {`${trainkoreApiKeys?.modelProviders?.openai_azure?.key.slice(
                  0,
                  2
                )}...........${trainkoreApiKeys?.modelProviders?.openai_azure?.key.slice(
                  -6
                )}`}
              </Text>
            ) : (
              <KeyModal
                name="openai_azure"
                title="Azure OpenAI"
                icon={SiAzurefunctions}
                orgName={orgName}
                orgId={orgId}
                link=""
              />
            )}
            <Text as="span">
              {formatDate(
                trainkoreApiKeys?.modelProviders?.openai_azure?.added
              )}
            </Text>
            <ThreeDotsPopOver
              configId={trainkoreApiKeys?.configId}
              name="openai_azure"
              keyType="modelProvider"
            />
          </div>
          <div className="pointer-events-none mb-4 grid grid-cols-[2fr_2fr_2fr_auto] items-center gap-4 border-b border-gray-200 pb-4 opacity-50 last:mb-0 last:border-0 last:pb-0">
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-400 dark:text-gray-500"
            >
              <GoogleIcon className="h-6 w-6 flex-shrink-0" />
              Google
            </Text>
            {trainkoreApiKeys?.modelProviders?.google?.key ? (
              <Text as="span" className="truncate">
                {`${trainkoreApiKeys?.modelProviders?.google?.key.slice(
                  0,
                  2
                )}...........${trainkoreApiKeys?.modelProviders?.google?.key.slice(
                  -6
                )}`}
              </Text>
            ) : (
              <KeyModal
                name="google"
                title="Google"
                icon={GoogleIcon}
                orgName={orgName}
                orgId={orgId}
                link="https://aistudio.google.com/app/apikey"
              />
            )}
            <Text as="span">
              {formatDate(trainkoreApiKeys?.modelProviders?.google?.added)}
            </Text>
            <ThreeDotsPopOver
              configId={trainkoreApiKeys?.configId}
              name="google"
              keyType="modelProvider"
            />
          </div>
        </div>
      </WidgetCard>
      <div className="mt-6">
        <WidgetCard
          title="Traincore API keys"
          titleClassName="font-medium text-sm text-gray-800 mb-2.5 font-inter"
          description="Your secret API keys are listed below. Please note that we do not display your API keys again after you generate them."
        >
          <div>
            <div className="mb-4 mt-8 grid items-center gap-4 pb-4 font-medium last:mb-0 last:border-0 last:pb-0">
              <Text
                as="span"
                className="text-sm text-gray-600 dark:text-gray-700"
              >
                API keys allow you to interact with Humanloop programmatically
                through our API and SDK.
              </Text>
              <Text as="span">
                More information and guides can be found in{' '}
                <a
                  href="https://docs-trainkore.vercel.app/documentation/manage-api-keys"
                  target="_blank"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  our docs
                </a>
              </Text>
              <CreateAPIKeyModal orgName={orgName} orgId={orgId} />
            </div>
            {trainkoreApiKeys?.trainkoreApiKeys?.length > 0 && (
              <div className="mb-4 mt-8 grid grid-cols-[2fr_2fr_2fr_auto] items-center gap-4 border-b border-gray-200 pb-4 font-medium last:mb-0 last:border-0 last:pb-0">
                <Text
                  as="span"
                  className="text-sm text-gray-600 dark:text-gray-700"
                >
                  Provider
                </Text>
                <Text as="span">Key</Text>
                <Text as="span">Added</Text>
                <Text as="span"></Text>
              </div>
            )}

            {trainkoreApiKeys?.trainkoreApiKeys?.length > 0 &&
              trainkoreApiKeys.trainkoreApiKeys.map((apiKey: any) => {
                return (
                  <div
                    key={apiKey._id}
                    className="mb-4 grid grid-cols-[2fr_2fr_2fr_auto] items-center gap-4 border-b border-gray-200 pb-4 last:mb-0 last:border-0 last:pb-0"
                  >
                    <Text
                      as="span"
                      className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700"
                    >
                      {apiKey.name}
                    </Text>
                    <Text as="span" className="truncate">
                      {`${apiKey.secretKey.slice(
                        0,
                        2
                      )}...........${apiKey.secretKey.slice(-6)}`}
                    </Text>
                    <Text as="span">{formatDate(apiKey?.created)}</Text>
                    <ThreeDotsPopOver
                      name={apiKey.name}
                      configId={trainkoreApiKeys?.configId}
                      secretKey={apiKey.secretKey}
                      keyType="trainkore"
                    />
                  </div>
                );
              })}
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
