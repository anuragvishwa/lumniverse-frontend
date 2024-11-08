import Header from '@/app/multi-step/header';

export default function MultiStepLayoutTwo({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen @container">
      <Header />
      {children}
    </div>
  );
}
