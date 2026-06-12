import { useAuth } from '@/auth/store';

function useUserLayout() {
    const checkLogin = useAuth(state => state.checkLogin);

    return {
        checkLogin,
    };
}

export default useUserLayout;