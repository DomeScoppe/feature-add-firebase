import { Flex, Spinner } from '@chakra-ui/react';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import { Nabvar } from '../components/Navbar';
import { JobDetailPage } from '../pages/JobDetailPage';

import { LoginPage } from '../pages/LoginPage';
import MyAccount from '../pages/myAccount/MyAccount';
import Recover from '../pages/recover/Recover';
import { RegisterPage } from '../pages/RegisterPage';
import { webRoutes } from '../utilities/web.routes';
import { OnlyGuestRoute, ProtectedRoute } from './components';

const SignIn = lazy(() => import('../pages/signIn/SignIn'));
const SignUp = lazy(() => import('../pages/signUp/SignUp'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));

export function Router() {
	return (
		<BrowserRouter>
			<Nabvar />

			<ReactRoutes>
				{
					// Public routes
				}
				<Route
					path={webRoutes.login}
					element={
						<Suspense
							fallback={
								<Flex alignItems={'center'} justifyContent={'center'} py={10}>
									<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.500" size="xl" />
								</Flex>
							}
						>
							<SignIn />
						</Suspense>
					}
				/>
				<Route
					path={webRoutes.register}
					element={
						<Suspense
							fallback={
								<Flex alignItems={'center'} justifyContent={'center'} py={10}>
									<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.500" size="xl" />
								</Flex>
							}
						>
							<SignUp />
						</Suspense>
					}
				/>
				<Route path={webRoutes.companies} element={<p>Companies page</p>} />
				<Route
					index
					path={webRoutes.root}
					element={
						<Suspense
							fallback={
								<Flex alignItems={'center'} justifyContent={'center'} py={10}>
									<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.500" size="xl" />
								</Flex>
							}
						>
							<HomePage />
						</Suspense>
					}
				/>
				<Route path={webRoutes.jobs + '/:id'} element={<JobDetailPage />} />
				{
					// Protected routes
				}
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<MyAccount />
						</ProtectedRoute>
					}
				/>
			</ReactRoutes>
		</BrowserRouter>
	);
}
