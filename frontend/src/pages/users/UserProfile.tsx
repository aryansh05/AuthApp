import { Button } from "@/components/ui/button";
import useUserProfile, { formatRoles } from "@/logic/useUserProfile";
import type { InfoRowProps } from "@/models/infoRowProps";
import toast from "react-hot-toast";

function UserProfile() {
  const { user, initials} = useUserProfile();

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border bg-card p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {
              user?.image ? (
              <img
                src={user?.image}
                alt={user?.name}
              />
            ) : (
              <div className="h-32 w-32 rounded-full flex items-center justify-center text-4xl font-bold">
                {initials}
              </div>
            )
            }
            <div className="flex-1">
              <h1 className="text-4xl font-bold tracking-tight">
                {user?.name}
              </h1>

              <p className="mt-2 text-muted-foreground">
                {user?.email}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-green-500/10 px-4 py-1 text-sm font-medium text-green-600">
                  Active
                </span>

                <span className="rounded-full bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-600">
                  Verified User
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
              onClick={() => {
                toast.success(`Hello ${user?.name}`);
              }
              }
              >Edit Profile</Button>

              <Button 
              onClick={() => {
                toast.success(`Hello ${user?.name}`);
              }
              }
              variant="outline">
                Change Password
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
              Account Information
            </h2>

            <div className="space-y-5">
              <InfoRow
                label="Full Name"
                value={user?.name || "N/A"}
              />

              <InfoRow
                label="Email Address"
                value={user?.email || "N/A"}
              />

              <InfoRow
                label="User ID"
                value={user?.id || "N/A"}
              />

              <InfoRow
                label="User Role"
                value={formatRoles(user?.roles)}
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
              Security Information
            </h2>

            <div className="space-y-5">
              <InfoRow
                label="Account Status"
                value="Active"
              />

              <InfoRow
                label="Email Verified"
                value="Yes"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">
            Account Activity
          </h2>

          <div className="space-y-4">
            <div className="rounded-xl border p-4">
              <p className="font-medium">
                Account Created
              </p>
              <p className="text-sm text-muted-foreground">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <p className="font-medium">
                Last Updated
              </p>
              <p className="text-sm text-muted-foreground">
                {user?.updatedAt
                  ? new Date(user.updatedAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>
      <p className="font-medium break-all">
        {value}
      </p>
    </div>
  );
}
}

export default UserProfile;