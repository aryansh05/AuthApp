import { Button } from "@/components/ui/button";
import useUserHome from "@/logic/useUserHome";
import toast from "react-hot-toast";

function UserHome() {

  const {user, getUserData, user1} = useUserHome();

 return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome, {user?.name}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account and security settings.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Profile</h2>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{user?.name}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Account Status</p>
                <p className="font-medium text-green-600">Active</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Security</h2>

            <div className="space-y-4">
              <Button className="w-full" onClick={() => {
                toast.success(`Hello ${user?.name}`);
              }
              }>
                Change Password
              </Button>

              <Button variant="outline" onClick={() => {
                toast.success(`Hello ${user?.name}`);
              }
              } className="w-full">
                Manage Sessions
              </Button>

              <Button variant="outline" onClick={() => {
                toast.success(`Hello ${user?.name}`);
              }
              } className="w-full">
                Enable 2FA
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Account Overview</h2>

            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">
                  Active Session
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm text-muted-foreground">
                  Profile Completion
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Recent Activity
          </h2>

          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <p className="font-medium">Successful Login</p>
              <p className="text-sm text-muted-foreground">
                Your account was accessed successfully.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="font-medium">Account Created</p>
              <p className="text-sm text-muted-foreground">
                Welcome to AuthApp.
              </p>
            </div>
          </div>
        </div>
      </div>
        <div className="text-center">
        <Button onClick={getUserData} className="rounded-2xl px-8 text-lg">
          Get current user
        </Button>

        <p>{user1?.name}</p>
      </div>
    </div>
  );
}

export default UserHome;